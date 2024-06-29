import { useAppState } from "../../context/FilterContext";
import Histogram from "./Histogram";
import LawCurve from "./LawCurve";


const Statistics = () => {

    const { metalType, law } = useAppState();

    let finalLaw =  metalType === "oro" ? law: 0;
    const data = [
        { tipoRoca: metalType, ley: finalLaw  },

      ];

    
    return (
        <div style={{textAlign: "center", padding: "50px"}}>
            <Histogram data={data}/>
            <LawCurve />
        </div>
    );
};

export default Statistics;