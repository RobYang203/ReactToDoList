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


        this.state = {
            modifyType:''
        };
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

        this.setState({modifyType:'w'});
    }

    finishItem(pos , type){
        const tar = this.DoThingList[pos];
        tar.type = type;
        this.setState({modifyType:'f'});
    }
    
    deletItem(pos){
        this.DoThingList.splice(pos,1);
        this.setState({modifyType:'d'});
    }

    createItemCompList(){
        this.DoThingCompList = [];
        this.DoThingList.map((data,i)=>{
            data.position = i;
            if(data.type !== 'd')
                this.DoThingCompList.push(<DoThingItem key={`item-${i}`} data={data} finishItem={this.finishItem} deletItem={this.deletItem}/>);
        });

    }



    //mounting & updating
    static getDerivedStateFromProps(nextProps,preState){
        preState = preState || {};
        preState.modifyType= preState.modifyType || '';
        return preState;
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
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.modifyType === ''){
            return false;
        }

        
        this.createItemCompList();
        return true;
    }

    getSnapshotBeforeUpdate(preProps,preState){
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        
    }

    //Unmounting
    componentWillUnmount(){

    }


}