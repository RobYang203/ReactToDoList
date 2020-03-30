import React from 'react'
import ReactDOM from 'react-dom'

class InputArea extends React.Component{
    constructor(props){
        super(props);
        this.sendDate = this.sendDate.bind(this);
        this.inputRef = React.createRef();
    }

    sendDate(){
        const inputValue = this.inputRef.current.value;
       
        if(inputValue === null || inputValue === undefined || inputValue === ""){
            alert("Please input what you want to do !");
            return;
        }

        if(this.props.insertItem){
            this.props.insertItem(inputValue);
        }   
        this.inputRef.current.value = "";
    }
    render(){
        return(
            <div  className="header">
                <h2>My To Do List</h2>
                <input type="text" ref={this.inputRef} placeholder="Title..."/>
                <span onClick={this.sendDate} className="addBtn">Add</span>
            </div>
        );
    }
}

class DoThingItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {itemClass :""};
        this.itemClick = this.itemClick.bind(this);
        this.itemDeletClick = this.itemDeletClick.bind(this);
    }

    itemClick(){
        if(!this.props.finishItem)
            return;

        const type = this.props.data.type;
        let changeType = "w";
        switch(type){
            case 'w':
                changeType = "f";
                break;
            case 'f':
                changeType = "w";
                break;
        }
        this.props.finishItem(this.props.data.position , changeType);       
    }
    itemDeletClick(){
        if(!this.props.deletItem)
            return;
        this.props.deletItem(this.props.data.position);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const itemType = nextProps.data.type;
        switch(itemType){
            case 'w':
                prevState.itemClass = "";
                break;
            case 'f':
                prevState.itemClass = "checked";
                break;
        }
       
        return prevState;
    }    

    render(){
        return(
            <li className={this.state.itemClass} >
                <div onClick={this.itemClick}>{this.props.data.description}</div>       
                <div className="close" onClick={this.itemDeletClick}>{"\u00D7"}</div>
            </li>
        );
    }
}

export {DoThingItem,InputArea}