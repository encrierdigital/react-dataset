import * as React from 'react'
import {ModelTest} from "../../models/ModelTest";
import DbInput from "../commons/DbInput";

export default class FormTest extends React.PureComponent {

    public model: any = new ModelTest([{name: 'François', age: 58, car: 'Classe C'}])

    state = {
        name: '',
        age: 0
    }

    constructor (props: {}) {

        super(props)

        this.state = {
            name: this.model.name,
            age: this.model.age
        }

        this.model.onDataChange('age', this.onAgeUpdate)
        this.model.onDataChange('name', this.onNameUpdate)
    }

    render() {
        //this.model.name = 'François Maujean'
        console.log('render form')

        return <>
            <h1>Dataset test form</h1>
            <hr/>
            <p>Nom : {this.state.name} Age : {this.state.age}</p>
            <DbInput dataset={this.model} fieldName="name"/>
            <DbInput dataset={this.model} fieldName="age"/>
            <button className="btn btn-primary" onClick={this.incrementAge}>Age</button>
        </>
    }

    onAgeUpdate = (age) => {
        console.log('on age change', age)
        this.setState({age: age})
    }
    onNameUpdate = (name) => {
        console.log('on name change', name)
        this.setState({name: name})
    }
    incrementAge = () => {
        console.log('increment age', this)
        this.model.age++
        console.log(this.model)
    }
}
