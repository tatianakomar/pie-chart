import './App.css';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import data from '../../utils/data.json';

const chartColors = ['#186eab', '#b4d7f0', '#2491bd']

const prepareChartData = (data, year) => {
  var result = {}
  for (let el of data){
    if(el.year === year || year === 'All' ){
      if(result[el.course]){
          result[el.course] = result[el.course]+ el.students;
      }else{
          result[el.course] = el.students;
      }
    }
  }

  const studentsArray = Object.keys(result).map(val => {return {
    'name': val,
    'students':result[val]}});
  return studentsArray;
}

const preapareTableData = (data, year,course )=>{
  const ungroupTableData = data.filter(element => ( year ==='All' || element.year === year ) && element.course === course);
  const groupTableObject = ungroupTableData.reduce((acc, element)=>{
    if(!acc[element.instructor]){
      acc[element.instructor] = {'year':element.year, 'course':element.course, 'instructor':element.instructor, 'students':element.students };
    }else{
      acc[element.instructor].students = acc[element.instructor].students + element.students
    }
    return acc;
  },{});

  const groupTableData = Object.values(groupTableObject);
  return groupTableData;
}

function App() {
  const [year, setYear] = useState('All');
  const [course, setCourse] = useState();

  function onChangeValue(event) {
    if(event.target.value !=='All'){
      setYear(parseInt(event.target.value));
    }
    else{
      setYear(event.target.value);
    };
  }

  const selectCourse= (event)=> {
    setCourse(event.name)
  }

  const chartData =  prepareChartData(data, year);
  function sortChartData(x,y) {
    if (x.name < y.name) {return -1}
    if (x.name > y.name) {return 1}
    return 0
  }
  const sortedChartData = chartData.sort(sortChartData);
  const groupTableData = preapareTableData(data, year, course);

  const average = groupTableData.reduce((sum, current) => sum + current.students, 0) / groupTableData.length;
  
  return (
    <>
      <h1 className="main_title">Students by Course {year === 'All' ? '2015 and 2016' :year}</h1>
      <div className="radio-btn_container">
        <p className="radio-btn_title">Years:</p>
        <label className="radio-btn_label" htmlFor='all'>
          <input className="radio-btn_input" type='radio' id='all' name='year' value='All' checked={year === 'All'} onChange={onChangeValue} />
          All
        </label>
        <label className="radio-btn_label" htmlFor='2015'>
          <input className="radio-btn_input" type='radio' id='2015' name='year' value='2015' checked={year === 2015} onChange={onChangeValue} />
          2015
        </label>
        <label className="radio-btn_label" htmlFor='2016'>
          <input className="radio-btn_input" type='radio' id='2016' name='year' value='2016' checked={year === 2016} onChange={onChangeValue} />
          2016
        </label>
      </div>
      <div className="chart_container">
        <PieChart className="chart_pie" width={300} height={300}>
            <Pie data={sortedChartData} dataKey='students' cx='50%' cy='60%' outerRadius={130} onClick={selectCourse}>
              {
                sortedChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index]}/>
                ))
              }
            </Pie>
            <Legend iconType='square' iconSize='10' wrapperStyle={{ position: 'relative' }} formatter={(value, entry, index) => <span className="chart_legend_text">{value}</span>}></Legend>
        </PieChart>
        {course && (
          <div className="table_container">
            <h2 className="table_title">{course}</h2>
            <table className="table_content">
              <tbody>
                <tr>
                  <th>Year</th>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Students</th>
                </tr>
                {groupTableData.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.year}</td>
                      <td>{val.course}</td>
                      <td>{val.instructor}</td>
                      <td style={val.students <= average ? {fontWeight:'600'}:{fontWeight:'400'}}>{val.students}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
export default App;
