// import * as React from 'react';
// import { useSelector } from 'react-redux';
// import Paper from '@material-ui/core/Paper';
// import { Chart, ArgumentAxis, ValueAxis, LineSeries, ZoomAndPan } from '@devexpress/dx-react-chart-material-ui';
// import { scaleTime } from 'd3-scale';
// import { ArgumentScale } from '@devexpress/dx-react-chart';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import { politicianSelectors } from '../../../../../slices/politicianSlice';

const generateData = (n) => {
  const ret = [];
  let y = 0;
  const dt = new Date(2017, 2, 10);
  for (let i = 0; i < n; i += 1) {
    dt.setDate(dt.getDate() + 1);
    y += Math.round(Math.random() * 10 - 5);
    ret.push({ x: new Date(dt), y });
  }
  return ret;
};
const data = generateData(1);

const getMode = (zoom, pan) => {
  if (zoom && pan) {
    return 'both';
  }
  if (zoom && !pan) {
    return 'zoom';
  }
  if (!zoom && pan) {
    return 'pan';
  }
  return 'none';
};

const chartRootStyle = { marginRight: '20px' };
const inputsContainerStyle = { justifyContent: 'center' };

const ChartRoot = (props) => <Chart.Root {...props} style={chartRootStyle} />;

function Demo() {
  const TestData = useSelector(politicianSelectors.getChartData());
  const news = useSelector(politicianSelectors.getNews());
  console.log(data);
  console.log(news?.chart);
  const test = [
    { x: '2021-02-11T21:00:00.000000Z', y: 11 },
    { x: '2021-01-11T21:00:00.000000Z', y: 32 },
    { x: '2021-05-11T21:00:00.000000Z', y: 90 },
    { x: '2021-01-11T21:00:00.000000Z', y: 84 },
  ];

  const [zoomArgument] = React.useState(true);
  const [panArgument] = React.useState(true);
  const [zoomValue] = React.useState(true);
  const [panValue] = React.useState(true);

  return (
    <Paper>
      <Chart data={test} rootComponent={ChartRoot}>
        <ArgumentScale factory={scaleTime} />
        <ArgumentAxis />
        <ValueAxis />

        <LineSeries valueField="y" argumentField="x" />
        <ZoomAndPan
          interactionWithArguments={getMode(zoomArgument, panArgument)}
          interactionWithValues={getMode(zoomValue, panValue)}
        />
      </Chart>
    </Paper>
  );
}

export default React.memo(Demo);
