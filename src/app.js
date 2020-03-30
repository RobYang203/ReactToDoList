import React from 'react'
import ReactDOM from 'react-dom'
import {DoThingItem,InputArea} from './components'
import './css/main.css'
export default class App extends React.Component{
    //mounting
    constructor(props){
        super(props);
        this.DoThingList = [];
        this.DoThingCompList = [];
        this.insertItem = this.insertItem.bind(this);
        this.finishItem = this.finishItem.bind(this);
        this.deletItem = this.deletItem.bind(this);
        this.createItemCompList = this.createItemCompList.bind(this);

        this.state = {changeCount:0};
    }

    insertItem(text){
        if(text === null || text === undefined || text === ""){
            return;
        }
        const index =  this.DoThingList.length;
        const now = new Date().toLocaleString();

        this.DoThingList.push({
            id:index,
            type: 'w',
            date: now,
            description:text
        });

        this.setState({changeCount:1});
    }

    finishItem(pos , type){
        const tar = this.DoThingList[pos];
        tar.type = type;
        this.setState({changeCount:1});
    }
    
    deletItem(pos){
        this.DoThingList.splice(pos,1);
        this.setState({changeCount:1});
    }

    createItemCompList(){
        this.DoThingCompList = [];
        this.DoThingList.map((data,i)=>{
            data.position = i;
            if(data.type !== 'd')
                this.DoThingCompList.push(<DoThingItem data={data} finishItem={this.finishItem} deletItem={this.deletItem}/>);
        });

        this.setState({changeCount:0});
    }

    //mounting
    componentWillMount(){

    }

    //mounting & updating
    static getDerivedStateFromProps(nextProps,preState){

    }
    
    //mounting & updating
    render(){
        return(
            <div>
                <InputArea insertItem={this.insertItem}/>
                <ul >
                    {this.DoThingCompList}
                </ul>
            </div>
        );
    }

    //mounting 
    componentDidMount(){

    }

    //updating
    componentWillReceiveProps(nextProps){

    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextState.changeCount === 0){
            return false;
        }

        
        this.createItemCompList();
        return true;
    }

    componentWillUpdate(nextProps,nextState){

    }

    getSnapshotBeforeUpdate(preProps,preState){

    }

    //Unmounting
    componentWillUnmount(){

    }


}