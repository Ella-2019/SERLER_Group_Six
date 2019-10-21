import React from 'react';
import {ColumnsModel, QueryBuilderComponent} from '@syncfusion/ej2-react-querybuilder';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page } from '@syncfusion/ej2-react-grids';
import { isNullOrUndefined } from 'util';
import {list} from './api-article.js'; 

const hardwareData= [
                    {"AUTHOR": "Pepito Arcoiris", "TITLE": "From data mining to knowledge discovery in databases", "DATE": "2018-05-07",
                    "JOURNAL": "ACM", "VOLUME": "02", "NUMBER": "01","PAGES":"01-41"  },
                    {"AUTHOR": "Will Smith", "TITLE": "An amazing research about cinematography", "DATE": "2015-07-29",
                    "JOURNAL": "Springer", "VOLUME": "25", "NUMBER": "11" ,"PAGES":"110-166"},
                    {"AUTHOR": "Ranney, Matt", "TITLE": "Hybrid automata: An algorithmic approach to the specification and verification of hybrid systems", "DATE": "2015-12-30",
                    "JOURNAL": "ACM", "VOLUME": "13", "NUMBER": "55","PAGES":"145-197" },
    
                    ];
const columnData= [
                  {field: 'AUTHOR', label: 'AUTHOR', type: 'string', 
                  operators: [{ key: 'Contains', value: 'contains' },{ key: 'Dose not contains', value: 'notin' },
                  { key: 'Begins with', value: 'startswith' }, { key: 'End with', value: 'endswith' },
                  { key: 'Is equat to', value: 'equal' }]
                  },
                  { field: 'TITLE', label: 'TITLE', type: 'string' , 
                  operators: [{ key: 'Contains', value: 'contains' },{ key: 'Dose not contains', value: 'notin' },
                  { key: 'Begins with', value: 'startswith' }, { key: 'End with', value: 'endswith' },
                  { key: 'Is equat to', value: 'equal' }]
                  },
                  { field: 'DATE', label: 'DATE', type: 'string' , 
                  operators: [{ key: 'Contains', value: 'contains' },{ key: 'Dose not contains', value: 'notin' },
                  { key: 'Begins with', value: 'startswith' }, { key: 'End with', value: 'endswith' },
                  { key: 'Is equat to', value: 'equal' }]
                  },
                  { field: 'JOURNAL', label: 'JOURNAL', type: 'string' , 
                  operators: [{ key: 'Contains', value: 'contains' },{ key: 'Dose not contains', value: 'notin' },
                  { key: 'Begins with', value: 'startswith' }, { key: 'End with', value: 'endswith' },
                  { key: 'Is equat to', value: 'equal' }]
                  },
                  { field: 'VOLUME', label: 'VOLUME', type: 'string' , 
                  operators: [{ key: 'Contains', value: 'contains' },{ key: 'Dose not contains', value: 'notin' },
                  { key: 'Begins with', value: 'startswith' }, { key: 'End with', value: 'endswith' },
                  { key: 'Is equat to', value: 'equal' }]
                  },
                  { field: 'NUMBER', label: 'NUMBER', type: 'string' , 
                  operators: [{ key: 'Contains', value: 'contains' },{ key: 'Dose not contains', value: 'notin' },
                  { key: 'Begins with', value: 'startswith' }, { key: 'End with', value: 'endswith' },
                  { key: 'Is equat to', value: 'equal' }]
                  },
                  { field: 'PAGES', label: 'PAGES', type: 'string' , 
                  operators: [{ key: 'Contains', value: 'contains' },{ key: 'Dose not contains', value: 'notin' },
                  { key: 'Begins with', value: 'startswith' }, { key: 'End with', value: 'endswith' },
                  { key: 'Is equat to', value: 'equal' }]
                  }
                  ];
                  
const datamanager = new DataManager(hardwareData);
const query = new Query().select(['AUTHOR', 'TITLE', 'DATE', 'JOURNAL', 'VOLUME', 'NUMBER','PAGES']);

class querybuilder extends React.Component {
  state = {
      articles: [] 
  }               
  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({articles: data})
        console.log(this.state)
      }
    })
  }
  updateRule = ()=>() => {
      var predicate=new Predicate;
      predicate = this.qryBldrObj.getPredicate({ condition: this.qryBldrObj.rule.condition, rules: this.qryBldrObj.rule.rules });
      if (isNullOrUndefined(predicate))
      { this.gridObj.query = new Query().select(['AUTHOR', 'TITLE', 'DATE', 'JOURNAL', 'VOLUME', 'NUMBER','PAGES']); }
      else
      { this.gridObj.query = new Query().select(['AUTHOR', 'TITLE', 'DATE', 'JOURNAL', 'VOLUME', 'NUMBER'],'PAGES').where(predicate); }
      this.gridObj.refresh();
  } 
    
   
  render() {
      return (
      <div>
          <style>@import url(https://cdn.syncfusion.com/ej2/material.css);</style>
          <QueryBuilderComponent width='100%' dataSource={hardwareData} columns={columnData} ref={(scope) => { this.qryBldrObj = scope; }} />
          <ButtonComponent onClick={this.updateRule()} >Filter Grid</ButtonComponent>
          <GridComponent allowPaging={true} dataSource={datamanager} width='100%'
            ref={(scope) => { this.gridObj = scope; }} query={query} >
            <ColumnsDirective>
            <ColumnDirective field='AUTHOR' headerText='AUTHOR' width='120' textAlign='Right' />
            <ColumnDirective field='TITLE' headerText='TITLE' width='140' />
            <ColumnDirective field='DATE' headerText='DATE' width='140' textAlign='Right' />
            <ColumnDirective field='JOURNAL' headerText='JOURNAL' width='130' />
            <ColumnDirective field='VOLUME' headerText='VOLUME' width='120' />
            <ColumnDirective field='NUMBER' headerText='NUMBER' width='120' />
            <ColumnDirective field='PAGES' headerText='PAGES' width='120' />
            </ColumnsDirective>
            <Inject services={[Page]} />
          </GridComponent>
      </div>
      )
  }
}
    

  
  export default querybuilder;
  

/* import QueryBuilder from 'react-querybuilder';
import React from 'react'
const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'age', label: 'Age' },
  { name: 'address', label: 'Address' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email' },
  { name: 'twitter', label: 'Twitter' },
  { name: 'isDev', label: 'Is a Developer?', value: false }
];
 
class querybuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
  }
  this.logQuery = this.logQuery.bind(this);
}
logQuery(query) {
  console.log(query);
}
render() {
    return (
        <div >
            <QueryBuilder fields={fields} onQueryChange={this.logQuery} />
        </div>
    )
    }
}
export default querybuilder; */