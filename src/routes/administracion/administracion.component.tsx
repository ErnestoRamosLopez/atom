import EarningsChart from "../../components/earnings-chart/earnings-chart.component";

const Administracion = () => {


    return (
        <div>
            <div className="grid grid-cols-2">
                <div className="col-span-1">
                    <EarningsChart />
                </div>
            </div>      
        </div>
    )
}

export default Administracion;