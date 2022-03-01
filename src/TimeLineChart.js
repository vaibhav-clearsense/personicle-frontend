import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import sample_events from "../sample_data/sample_events"
import { ConsoleWriter } from "istanbul-lib-report";

function TimelineChart ({google}) {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (google && !chart) {

      function endDateInMilliseconds(startDate, duration) {
        var formattedDate = dateToStandardFormat(startDate)
        var startDateInMS = formattedDate.getTime(); 
        var endDateInMS = startDateInMS + duration
        return endDateInMS;
     }

     // convert date to standard format to be compatible with different browsers
     function dateToStandardFormat(date){
        var values = date.split(/[^0-9]/),
        year = parseInt(values[0]),
        month = parseInt(values[1]) - 1,
        day = parseInt(values[2]),
        hours = parseInt(values[3]),
        minutes = parseInt(values[4]),
        seconds = parseInt(values[5])

        var formattedDate = new Date(year, month, day, hours, minutes, seconds);
        return formattedDate
     }
     
     let events = sample_events["sample_events"];

     function GFG_Fun(endDateInMS) {
            var endDate = new Date(endDateInMS);
            return endDate;
      }

      // Create the data table.
      
      const data = new google.visualization.DataTable();
      data.addColumn({ type: 'string', id: 'Events' });
      data.addColumn({ type: 'string', id: 'Task ID' });
      data.addColumn({ type: 'date', id: 'Start Date' });
      data.addColumn({ type: 'date', id: 'End Date' });
        events.forEach(event => 
        {
          var s = new Date(event.startTime)
          data.addRow([event.activityName, event.logId.toString(), dateToStandardFormat(event.startTime), GFG_Fun(endDateInMilliseconds(event.startTime, event.duration))]);
        });
  
      // Set chart options
      var options = {'title':'Gantt Chart Timeline Visualization',
                    'width':500,
                    'height':300,
                    timeline: { groupByRowLabel: true}, 
                    displayAnnotations: true};

      // Create a dashboard.
      var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

      // Create a range slider, passing some options
      var dateRangeSlider = new google.visualization.ControlWrapper({
        'controlType': 'DateRangeFilter',
        'containerId': 'filter_div',
        'options': {
          'filterColumnIndex': 2
        }
      });

      // Create a timeline chart, passing some options
      var timelineChart = new google.visualization.ChartWrapper({
        'chartType': 'Timeline',
        'containerId': 'timeline',
        'options': {
          'width': '100%',
          'height': 215,
          'pieSliceText': 'value',
          'legend': 'right'
        }
      });

      // Instantiate and draw our chart, passing in some options.
      //var container = document.getElementById('timeline');
      //var chart = new google.visualization.Timeline(container);
      var dashboard = new google.visualization.Dashboard(
                     document.getElementById('dashboard_div'));
     
      const chart = new google.visualization.Timeline(document.getElementById('timeline'));
      dashboard.bind(dateRangeSlider, timelineChart);
      dashboard.draw(data, options);
      setChart(timeline);
      
    }
  }, [google, chart]);

  return (
    <>
      {!google && <Spinner />}
        <div id="dashboard_div">
          <div id="filter_div"></div>
          <div id="timeline" className={!google ? '.d-none' : ''} />
        </div>
      
    </>
  )
}

export default TimelineChart;
