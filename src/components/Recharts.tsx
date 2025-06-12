import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ReferenceArea, Tooltip, XAxis, YAxis } from "recharts"
import { dataGroupedByMonthYear, dataAggregationByDestination } from "../helpers/dataHandlers";
import { useState } from "react";

const xFormatter = (data: string) => {
	const [year, month] = data.split('-').map(Number);
	const date = new Date(year, month - 1, 1);
	const yearString = date.getFullYear();
	const monthString = date.toLocaleString('en-US', { month: 'short' });

	return `${yearString}, ${monthString}`;
}

const sharedFocusChartId = "anyId"

const chartData = dataGroupedByMonthYear.map((item, index) => ({
	...item,
	// The index is the perfect, gapless numerical value for the x-axis.
	index: index,
}));

const RechartLine = ({ enableCartessian }: { enableCartessian: boolean }) => {
	const [zoomState, setZoomState] = useState<any>({
		data: chartData,
		left: 'dataMin',
		right: 'dataMax',
		bottom: 0, //'dataMin',
		top: 'dataMax + 5',
		refAreaLeft: '',
		refAreaRight: '',
	});

	const handleZoom = () => {
		// Use functional update to ensure we have the latest state
		setZoomState(prevState => {
			let { refAreaLeft, refAreaRight } = prevState;

			if (refAreaLeft === refAreaRight || refAreaRight === '') {
				return {
					...prevState,
					refAreaLeft: '',
					refAreaRight: '',
				};
			}

			if (refAreaLeft > refAreaRight) [refAreaRight, refAreaLeft] = [refAreaRight, refAreaLeft];

			const yDomainData = chartData.slice(refAreaLeft, refAreaRight + 1);
			const yMax = Math.max(...yDomainData.map(i => i.shipments));
			const yMin = Math.min(...yDomainData.map(i => i.shipments));

			return {
				...prevState, // Keep other state properties
				data: chartData.slice(), // Create a new array reference!
				refAreaLeft: '',
				refAreaRight: '',
				left: refAreaLeft,
				right: refAreaRight,
				bottom: yMin - 5,
				top: yMax + 5,
			};
		});
	};

	const handleZoomOut = () => {
		setZoomState(prevState => ({
			...prevState,
			data: chartData.slice(), // Create a new array reference!
			refAreaLeft: '',
			refAreaRight: '',
			left: 0,
			right: chartData.length - 1,
			bottom: 0,
			top: 'dataMax + 5',
		}));
	};


	const formatLabel = (index: number) => {
		// Ensure the index is within bounds and an integer
		const validIndex = Math.round(index);
		if (chartData[validIndex]) {
			// Use your existing xFormatter or create a new one
			return xFormatter(chartData[validIndex].dateRange);
		}
		return '';
	};

	return (
		<div>
			<button type="button" className="btn update" onClick={() => handleZoomOut()} style={{ padding: '5px 10px' }}>
				Zoom Out
			</button>
			<LineChart width={700} height={300} data={zoomState.data}
				margin={{ top: 20, right: 10, bottom: 5, left: 5 }}
				syncId={sharedFocusChartId}
				style={{ userSelect: 'none' }}
				onMouseDown={e => e && setZoomState(prev => ({ ...prev, refAreaLeft: e.activeTooltipIndex }))}
				onMouseMove={e => e && setZoomState(prev => {
					if (typeof prev.refAreaLeft === 'number') {
						return { ...prev, refAreaRight: e.activeTooltipIndex };
					}
					return prev;
				})}
				onMouseUp={handleZoom}
			>
				{enableCartessian && <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />}
				<XAxis allowDataOverflow domain={[zoomState.left, zoomState.right]}
					dataKey="index"
					type="number"
					stroke="#bb3d22"
					interval="preserveStartEnd"
					fontSize={10}
					tickFormatter={formatLabel}
				/>
				<YAxis allowDataOverflow domain={[zoomState.bottom, zoomState.top]} fontSize={10} stroke="#901900" />
				<Tooltip labelStyle={{ color: 'black' }} labelFormatter={formatLabel} />
				<Line type="monotone" dataKey="shipments" stroke="#3f5dde" strokeWidth={2} isAnimationActive={true}
					label={{ fill: 'green', fontSize: 10, dy: -8, fontWeight: 'bold' }} animationDuration={500} />

				{typeof zoomState.refAreaLeft === 'number' && typeof zoomState.refAreaRight === 'number' ? (
					<ReferenceArea
						x1={zoomState.refAreaLeft}
						x2={zoomState.refAreaRight}
						strokeOpacity={0.3}
						ifOverflow="visible" // Important for ReferenceArea
					/>
				) : null}

			</LineChart >
		</div>
	)
}

const RechartBar = ({ enableCartessian }: { enableCartessian: boolean }) => {
	return (
		<BarChart width={700} height={300} data={dataGroupedByMonthYear} syncId={sharedFocusChartId}>
			{enableCartessian && <CartesianGrid strokeDasharray="3 3" />}
			<XAxis dataKey="dateRange" type="category" stroke="#bb3d22" interval={0} fontSize={10} tickFormatter={xFormatter} />
			<YAxis fontSize={10} stroke="#901900" />
			<Legend />
			<Tooltip labelStyle={{ color: 'black' }} />
			<Bar dataKey="shipments" barSize={20} fill="#8884d8" label={{ fill: 'white', fontSize: 14, dy: -8, fontWeight: 'bold' }} />
		</BarChart>
	)
}

const RechartPie = () => {
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

	return (
		<PieChart width={700} height={500} margin={{ top: 10, right: 5, bottom: 10, left: 5 }}>
			<Pie
				data={dataAggregationByDestination}
				dataKey="shipments"
				nameKey="destination"
				cx="50%"
				cy="50%"
				outerRadius={150}
				fill="#8884d8"
				label
			>
				{dataAggregationByDestination.map((_, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Tooltip />
		</PieChart>
	)
}

export const ReCharts = () => {

	const [enableCartessian, setEnableCartessian] = useState(true)

	const titleStyles = { color: 'black' }

	return (
		<div>
			<h1 style={titleStyles}>Recharts</h1>
			<h2 style={titleStyles}>Number of shipments per month</h2>
			<div style={{ marginBlock: '10px' }}>
				<input type="checkbox" id="checkbox-enabler" checked={enableCartessian} onChange={(e) => setEnableCartessian(e.target.checked)} />
				<label htmlFor="checkbox-enabler" style={{ color: 'black' }}>Enable cartesian grid for charts</label>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
				<RechartLine enableCartessian={enableCartessian} />
				<RechartBar enableCartessian={enableCartessian} />
			</div>
			<h2 style={titleStyles}>Shipments by country</h2>
			<RechartPie />
		</div>
	)
}