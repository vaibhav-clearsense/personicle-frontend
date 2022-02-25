import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import sample_events from "../sample_data/sample_events"

function TimelineChart ({google}) {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (google && !chart) {

      // Create functions 
      function endDateInMilliseconds(startDate, duration) {
        var startDate = new Date(startDate); // some mock date
        var startDateInMS = startDate.getTime(); 
        var endDateInMS = startDateInMS + duration
        return endDateInMS;
     }
     
     let events = sample_events["sample_events"];
     
     var endDate = endDateInMilliseconds(events[0].startTime, events[0].duration);

     function GFG_Fun(endDateInMS) {
            var endDate = new Date(endDateInMS);
            return endDate;
        }

    GFG_Fun(endDate);

      // Create the data table.
      
      const data = new google.visualization.DataTable();
      data.addColumn({ type: 'string', id: 'Events' });
      data.addColumn({ type: 'string', id: 'Task ID' });
      data.addColumn({ type: 'date', id: 'Start Date' });
      data.addColumn({ type: 'date', id: 'End Date' });
          events.forEach(event => 
          {
            data.addRow([event.activityName, event.logId.toString(), new Date(event.startTime), GFG_Fun(endDateInMilliseconds(event.startTime, event.duration))]);
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
        <div id="timeline" className={!google ? 'd-none' : ''} />
      </div>
      
    </>
  )
}

export default TimelineChart;
