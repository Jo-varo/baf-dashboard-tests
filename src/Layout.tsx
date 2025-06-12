import { useState } from "react"
import { ReCharts } from "./components/Recharts"
import { ApexCharts } from "./components/ApexCharts"

const Pages  = {
	RECHARTS : 'recharts',
	LIGHTWEIGHT_CHARTS : 'lightweight_charts',
	APEX_CHARTS : 'apex_charts',
}

export const Layout = () => {
	const [selectedPage,setSelectedPage] = useState<string>(Pages.RECHARTS)
	
	return (
		<div>
			<div style={{ display: 'flex', gap: '10px', justifyContent:'center' }}>
				<button onClick={() => setSelectedPage(Pages.RECHARTS)}>ReCharts</button>
				<button onClick={() => setSelectedPage(Pages.APEX_CHARTS)}>Apex Charts</button>
			</div>
			{selectedPage === Pages.RECHARTS && <ReCharts />}
			{selectedPage === Pages.APEX_CHARTS && <ApexCharts />}
		</div>
	)
}