import { useState } from "react"
import { ApexCharts } from "./components/ApexCharts"
import CDD from "./pages/CDD"

const Pages  = {
	RECHARTS : 'recharts',
	LIGHTWEIGHT_CHARTS : 'lightweight_charts',
	APEX_CHARTS : 'apex_charts',
	CDD : 'chart_designer_demo',
}

export const Layout = () => {
	const [selectedPage,setSelectedPage] = useState<string>(Pages.CDD)
	
	return (
		<div>
			<div style={{ display: 'flex', gap: '10px', justifyContent:'center' }}>
				<button onClick={() => setSelectedPage(Pages.APEX_CHARTS)}>Apex Charts</button>
				<button onClick={() => setSelectedPage(Pages.CDD)}>Chart Designer Demo</button>
			</div>
			{selectedPage === Pages.APEX_CHARTS && <ApexCharts />}
			{selectedPage === Pages.CDD && <CDD />}
		</div>
	)
}