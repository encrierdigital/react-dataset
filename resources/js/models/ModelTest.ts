
import get from 'lodash/get'
import forOwn from 'lodash/forOwn'
import assign from 'lodash/assign'

declare type TonFieldChangeCb = (name: string) => void
export class ModelTest {

    private _attributes!: Record<string, any>

    /*private name: string = ''
    private age: number = 0*/
    private onDataChangeCallbacks: any[] = []

    constructor(data: Record<string, any>[]) {

        //Object.assign(this._attributes, {} as Record<string, any>)
        this._attributes = {}

        this.defineFields(data)

        //this['name'] = 'François'
    }

    public onDataChange(fieldName: string, cb: TonFieldChangeCb) {
        console.log('affect cb', fieldName)
        this.onDataChangeCallbacks.push({fieldName: fieldName, cb})
        console.log('callBacks', this.onDataChangeCallbacks)
    }

    protected doOnDataChange(fieldName = '') {
        const callBacks = this.onDataChangeCallbacks.filter((item) => item.fieldName == fieldName)
        console.log('callBacks to call', callBacks)

        callBacks.forEach((item) => item.cb(this[fieldName]))
    }

    protected defineFields(data: Record<string, any>[]) {
        data.forEach((fieldDef) => {
            console.log(fieldDef)
            forOwn(fieldDef, (value, fieldName) => {
                //if (this.hasOwnProperty(fieldName)) {
                    console.log(fieldName,value)
                    Object.defineProperty(Object.getPrototypeOf(this), fieldName, {
                        //writable: false,
                        get: (): any => this.get(fieldName),
                        set: <T>(value: T) => this.set(fieldName, value),
                    });
                    console.log('set init', fieldName, value)
                    this.set(fieldName, value)
                //}

            })
            /*for(const [fieldName,value] of Object.entries(fieldDef)) {
            })*/
        })
    }
    protected set(name: string, value) {
        console.log('set field', name, value)
        if (this[name] == value) {
            console.log('canceled set field', name, value)
            return
        }
        console.log('set', name, value)
        const entry: Record<string, any> = {[name]: value}
        console.log('entry', entry)
        Object.assign(this._attributes, {[name]: value})
        //this._attributes = {...this._attributes, ...entry}
        this[name] = value

        this.doOnDataChange(name)
        //return value
    }

    protected get(name){
        console.log('get', name)
        return this._attributes[name]
        //return get(this._attributes, name, '')
        //return this[name]
    }

}
