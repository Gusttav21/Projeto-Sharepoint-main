import * as React from "react";
import { makeResetStyles, tokens } from "@fluentui/react-components";
import Table from "./components/Table/Table";
import { IReceitas } from "../../../interfaces/IReceitas";
import ListSP from "../../../../../shared/services/List.service";
import { IGeneralProps } from "../../../../../shared/interfaces/IGeneralProps";
import { IViewReceitasProps } from "./components/Table/IViewReceitasProps";


const useStackClassName = makeResetStyles({
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingHorizontalS

});

const ViewReceitas: React.FunctionComponent<IViewReceitasProps> = (props) => {

    const spList = new ListSP();
    const [receitas, setReceitas] = React.useState<IReceitas[]>([])
 
    React.useEffect(() =>{
        getReceitas().then(result =>{
            setReceitas(result)
        })
    }, [])
   
    async function getReceitas():Promise<IReceitas[]> {
        let resultReceitas:IGeneralProps = [];
        if(props.receitaIdList){
            resultReceitas = await spList.GetList(
                props.receitaIdList,['Id','Title','TipoReceita','Cara','DataTentativa','AttachmentFiles'],
                ['AttachmentFiles']);        
    }   
        return transformaGeneralParaReceitas(resultReceitas)
    }
    function transformaGeneralParaReceitas(general: IGeneralProps):IReceitas[]{
        const receitas: IReceitas[] = [];
        general.forEach((item:IGeneralProps) => {
            receitas.push({
                ID: item.ID,
                Title: item.Title,
                TipoReceita: item.TipoReceita ? item.TipoReceita : "",
                Cara: item.Cara,
                DataTentativaString: item.DataTentativa,
                Anexo: item.AttachmentFiles.results
            })
        })

        return receitas
    }
    return(
        <div className={useStackClassName()}>
            <Table item={receitas}/>
        </div>
    )
}
export default ViewReceitas