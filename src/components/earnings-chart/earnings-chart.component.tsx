import { ChangeEvent, useEffect, useState } from "react";
import { mesesList } from "../../utils/constantes-test.utils";
import moment from "moment";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";

const DATA_INITIAL_STATE = mesesList.map((item) => ({
    name: item,
    ganancia: 0
}));

const EarningsChart = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL ?? '';
    const [ordenesAnos] = useState(Array.from({ length: 5}).map((item, index) => moment().year() - (index*1)));
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const [selectedMonth, setSelectedMonth] = useState<number | string>('');
    const [chartData, setChartData] = useState(DATA_INITIAL_STATE);

    useEffect(() =>{
        const source = axios.CancelToken.source();

        const fetchEarnings = async () => {
            try {
                console.log(selectedMonth, selectedYear);
                
                const response = await axios.get(`${apiUrl}/management/earnings`, {
                    params: {
                        ...(selectedMonth !== undefined ? {month: selectedMonth} : {}),
                        year: selectedYear
                    },
                    cancelToken: source.token,
                });
                const earningData = response.data;
                setChartData( prev => {
                    let newData = [...prev];
                    newData = newData.map((item, index) => {
                        return { ...item, ganancia: earningData[index]}
                    })
                    return newData;
                });
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request canceled", err.message);
                } else {
                    //setError(err.message);
                }
            }
        };

        fetchEarnings();

        // Cleanup function to cancel the request
        return () => {
            source.cancel("Operation canceled due to new request.");
        };
    },[selectedMonth, selectedYear]);

    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear( Number(e.target?.value) );
    }

    const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let newMonth = e.target.value === '' ? e.target.value : Number(e.target.value);
        setSelectedMonth( newMonth );
    }

    return (
        <div className="grid grid-cols-4">
            <h2 className="col-span-full font-bold text-left">Ganancias por mes</h2>
            <div className="grid col-span-2 text-left">
                <span>Año</span>
                <select className="select select-bordered w-full max-w-xs" value={selectedYear} onChange={handleYearChange}>
                    {ordenesAnos.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="grid col-span-2 text-left">
                <span>Mes</span>
                <select className="select select-bordered w-full max-w-xs" value={selectedMonth} onChange={handleMonthChange}>
                    <option value={''}>Seleccione</option>
                    {mesesList.map((item, index) => (
                        <option key={index} value={index + 1}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="col-span-full w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ganancia" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default EarningsChart;