"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
class APIFeatures {
    query;
    queryString;
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        try {
            const queryObj = { ...this.queryString };
            const excludedFields = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach((el) => delete queryObj[el]);
            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
            const parsedQuery = JSON.parse(queryStr);
            const updatedQuery = {};
            for (const key in parsedQuery) {
                if (typeof parsedQuery[key] === 'string') {
                    const trimmedValue = parsedQuery[key].trim();
                    const safeValue = trimmedValue.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
                    updatedQuery[key] = { $regex: new RegExp(safeValue, 'i') };
                }
                else {
                    updatedQuery[key] = parsedQuery[key];
                }
            }
            Object.assign(parsedQuery, updatedQuery);
            if ('find' in this.query) {
                this.query = this.query.find(parsedQuery);
            }
            else if ('match' in this.query) {
                this.query = this.query.match(parsedQuery);
            }
        }
        catch (error) {
            console.error('Error in filter():', error);
        }
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            if ('sort' in this.query) {
                this.query = this.query.sort(sortBy);
            }
            else {
                const sortObj = {};
                sortBy.split(' ').forEach((field) => {
                    const direction = field.startsWith('-') ? -1 : 1;
                    const fieldName = field.startsWith('-') ? field.slice(1) : field;
                    sortObj[fieldName] = direction;
                });
                this.query = this.query.sort(sortObj);
            }
        }
        else {
            if ('sort' in this.query) {
                this.query = this.query.sort('-createdAt');
            }
            else {
                this.query = this.query.sort({ createdAt: -1 });
            }
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            if ('select' in this.query) {
                this.query = this.query.select(fields);
            }
            else {
                const fieldObj = {};
                fields.split(' ').forEach((field) => (fieldObj[field] = 1));
                this.query = this.query.project(fieldObj);
            }
        }
        else {
            if ('select' in this.query) {
                this.query = this.query.select('-__v');
            }
            else {
                this.query = this.query.project({ __v: 0 });
            }
        }
        return this;
    }
    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 100;
        const skip = (page - 1) * limit;
        if (isNaN(page) || isNaN(limit)) {
            console.warn('Invalid pagination parameters. Using default values.');
        }
        if ('skip' in this.query && 'limit' in this.query) {
            this.query = this.query.skip(skip).limit(limit);
        }
        else {
            this.query = this.query
                .pipeline()
                .concat([{ $skip: skip }, { $limit: limit }]);
        }
        return this;
    }
    getQuery() {
        return this.query;
    }
}
exports.APIFeatures = APIFeatures;
//# sourceMappingURL=apiFeatures.js.map