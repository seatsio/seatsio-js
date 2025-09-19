import { Page } from './Page'
import { Axios } from 'axios'

export interface PaginatedJson<T> {
    items: T[]
    next_page_starts_after?: number
    previous_page_ends_before?: number
}

interface PaginationParams {
    start_after_id?: number
    end_before_id?: number
}

export class AsyncIterator<T, Y> {
    client: Axios
    index: number
    items: T[]
    nextPageMustBeFetched: boolean
    nextPageStartsAfter?: number
    pageCreator: (data: PaginatedJson<Y>) => Page<T>
    pages: Page<T>[]
    params: PaginationParams
    url: string

    constructor (url: string, client: Axios, pageCreator: (data: PaginatedJson<Y>) => Page<T>, params = {}) {
        this.url = url
        this.client = client
        this.pageCreator = pageCreator
        this.params = params
        this.items = []
        this.pages = []
        this.index = 0
        this.nextPageMustBeFetched = true
    }

    fetch (fetchParams = {}) {
        return this.client.get(this.url, { params: fetchParams })
            .then(res => {
                if (res.data.next_page_starts_after) {
                    this.nextPageStartsAfter = res.data.next_page_starts_after
                    this.nextPageMustBeFetched = true
                } else {
                    this.nextPageMustBeFetched = false
                }

                const page = this.pageCreator(res.data)
                this.items = page.items
                this.pages.push(page)
            })
    }

    [Symbol.asyncIterator] () {
        const _this = this

        return {
            async next (): Promise<any> {
                if (_this.nextPageMustBeFetched && _this.items.length === 0) {
                    await _this.fetch(_this.params)
                } else if (_this.nextPageMustBeFetched && !_this.items[_this.index]) {
                    _this.params.start_after_id = _this.nextPageStartsAfter
                    await _this.fetch(_this.params)
                }
                if (!_this.items[_this.index]) {
                    return Promise.resolve({
                        done: true
                    })
                } else {
                    return Promise.resolve({ value: _this.items[_this.index++], done: false })
                }
            }
        }
    }
}
