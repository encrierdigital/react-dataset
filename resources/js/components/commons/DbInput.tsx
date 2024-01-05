import * as React from 'react'
import {ModelTest} from "../../models/ModelTest";

interface IDbComponentProps {
    dataset: ModelTest
    fieldName: string,

    //onChange: (dataset: ModelTest, fieldName: string) => void
}

interface IDbComponentState {

    value: string,

}
export default class DbInput extends React.PureComponent<IDbComponentProps, IDbComponentState> {

    constructor(props: IDbComponentProps) {
        super(props)

        this.state = {
            value: this.props.dataset[this.props.fieldName]
        }

        this.props.dataset.onDataChange(this.props.fieldName, this.onValueChange)
    }

    submitValue = () => {
        //this.props.onChange(this.props.dataset, this.props.fieldName)
        this.props.dataset[this.props.fieldName] = this.state.value
    }
    handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({value: (e.target as HTMLInputElement).value})
    }

    onValueChange = (value) => {
        console.log('new value', value)
        this.setState({value: value})
    }

    render() {
        console.log('render dbinput')
        return <input type="text" className="form-control" value={this.state.value} onChange={this.handleInput} onBlur={this.submitValue}/>;
    }
}
