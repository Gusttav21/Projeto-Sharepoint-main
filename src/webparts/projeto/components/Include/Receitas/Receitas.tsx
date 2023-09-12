import * as React from "react";
import { IReceitaProps } from "./IReceitasProps";
import { Combobox, ComboboxProps,Option, Field, Input, InputProps, makeResetStyles, tokens, Switch, makeStyles, typographyStyles, Button } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save24Regular } from "@fluentui/react-icons";
import { stringIsNullOrEmpty } from "@pnp/pnpjs";
import { IReceitas } from "../../../interfaces/IReceitas";
import ListSP from "../../../../../shared/services/List.service";


const useStackClassName = makeResetStyles({

    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingHorizontalS

});

const useStyles = makeStyles({
    description: {
      ...typographyStyles.caption1,

    }
});

const IncludeReceitas: React.FunctionComponent<IReceitaProps> = (props) =>{

    const spList=new ListSP();
    const styles = useStyles();
    const [nomeReceita, setNomeReceita] = React.useState('teste');
    const onChangeNomeReceita: InputProps["onChange"] = (ev, data) => {
            setNomeReceita(data.value);
      };
    
    const [selectedTipoReceita, setSelectedTipoReceita] = React.useState<string[]>([]);
    const onSelectedTipoReceita: ComboboxProps["onOptionSelect"] = (ev, data) => {
        setSelectedTipoReceita(data.selectedOptions);
        console.log(selectedTipoReceita)
      };

    const [receitaCara, setReceitaCara] = React.useState(false);
    const onChangeReceitaCara = React.useCallback(
        (ev) => {
            setReceitaCara(ev.currentTarget.checked);
        },[setReceitaCara]
      );

    const [dataReceita,setDataReceita] = React.useState<Date>(new Date())

    async function salvarReceita():Promise<void> 
    {
        if(verificaCamposObrigatorios()){
            const receita:IReceitas = {
                
                Title:nomeReceita,
                TipoReceita: selectedTipoReceita[0]?selectedTipoReceita[0]:"",
                Cara:receitaCara,
                DataTentativa:dataReceita

            };
            await spList.PostList(props.receitaIdList,receita).then((result)=>{
                console.log('sucesso',result);
            }).catch((error)=>{
                console.log('erro',error)
            })

        }
    }

    function verificaCamposObrigatorios():boolean{
        if(stringIsNullOrEmpty(nomeReceita)){
            alert("Campo Receita");
            return false;
        }
        return true
    }
    return(
        <React.Fragment>
        <div className={useStackClassName()}>
            <Field label="Receita" required>
                <Input style={{minWidth:100}} value={nomeReceita} onChange={onChangeNomeReceita}/>
            </Field>
            <Field label = "Tipo de Receita" required >
                <Combobox onOptionSelect={onSelectedTipoReceita} style={{minWidth:100}}>
                    <Option text="Entrada" value="Entrada">Entrada</Option>
                    <Option text="Principal" value="Principal">Principal</Option>
                    <Option text="Bebida" value="Bebida">Bebida</Option>
                    <Option text="Sobremesa" value="Sobremesa">Sobremesa</Option>
                </Combobox>
            </Field>
        </div>
        <div className={useStackClassName()}>
            <Field label="A Receita é Cara?" style={{ userSelect: 'none'}}>
            <Switch
                checked={receitaCara}
                onChange={onChangeReceitaCara}
                label={receitaCara ? "Sim" : "Não"}/>
                <span className={styles.description}>
                    {receitaCara ? "IMPAGAVÉÉÉL": "Ok"}
                </span>
            </Field>
        </div>
        <div className={useStackClassName()}>
            <Field label="Data de que tentou a receita">
            <DatePicker
                value={dataReceita}
                onSelectDate={(data:Date) => {setDataReceita(data)}}
                placeholder="Select a date..."
                />
            </Field>
        </div>
        <div className={useStackClassName()}>
            <Field label="Imagem da Receita">
                <input type="file" id="inputFile"/>
            </Field>
        </div>
        <div className={useStackClassName()}>
            <Button icon={<Save24Regular />} onClick={salvarReceita}>Salvar Registro</Button>
        </div>
        </React.Fragment>
    )
}
export default IncludeReceitas