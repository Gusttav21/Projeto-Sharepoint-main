import * as React from "react";
import { IReceitaProps } from "./IReceitasProps";
import { Combobox, ComboboxProps,Option, Field, Input, InputProps, makeResetStyles, tokens, Switch, makeStyles, typographyStyles, Button } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Save24Regular } from "@fluentui/react-icons";
import { stringIsNullOrEmpty } from "@pnp/pnpjs";
import { IReceitas } from "../../../interfaces/IReceitas";
import ListSP from "../../../../../shared/services/List.service";
import AlertDialog from "../../../../../shared/components/AlertDialog/AlertDialog";
import Loading from "../../../../../shared/components/Loading/Loading";


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

    const [caraReceita, setCaraReceita] = React.useState(false);
    const onChangecaraReceita = React.useCallback(
        (ev) => {
            setCaraReceita(ev.currentTarget.checked);
        },[setCaraReceita]
      );

    const [dataReceita,setDataReceita] = React.useState<Date>(new Date())

    const [fileReceita, setFileReceita] = React.useState<{name:any; content:string | ArrayBuffer | null;}>();
    function addFile(event:any){
        let resultFile = event.target.files;
        for(let i = 0; i < resultFile.length; i++){
          var file = resultFile[i];
          var reader = new FileReader();
          reader.onload = (function(file) {
              return function(e) {  
                  setFileReceita({
                    name: file.name,
                    content: e.target!.result
  
                })
              }
          })(file)
          reader.readAsArrayBuffer(file)
        }
    }


    async function salvarReceita():Promise<void> {

        if(verificaCamposObrigatorios()){
            
            setLoading(true);
            setLoadingMessage("Cadastrando receita...");

            const receita:IReceitas = {

                Title: nomeReceita,
                TipoReceita: selectedTipoReceita[0] ? selectedTipoReceita[0] : "",
                Cara: caraReceita,
                DataTentativa: dataReceita

            };
            await spList.PostList(props.receitaIdList, receita)
            .then((result) => {
                if(fileReceita && fileReceita.name){
                    spList.PostAttachmentList(props.receitaIdList, result.data.ID, fileReceita)
                    .then((result) => {
                        console.log('sucesso: ',result);
                        setLoading(false);
                        setAlertTitle('Cadastro de Receita');
                        setAlertMessage('Cadastro Realizado com Sucesso!');
                        setAlertOpen(true);
                    })
                    .catch((error) => {
                        setLoading(false);
                        setAlertTitle('Cadastro de Receita');
                        setAlertMessage('Cadastro Realizado Parcialmente com Sucesso, Não foi possivel salvar o anexo registro');
                        setAlertOpen(true);
                    })
                }else{
                    setLoading(false);
                    setAlertTitle('Cadastro de Receita');
                    setAlertMessage('Cadastro Realizado com Sucesso');
                    setAlertOpen(true);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log('erro: ',error);
                setAlertTitle('Cadastro de Receita');
                setAlertMessage(' Não foi possivel salvar');
                setAlertOpen(true);
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

    const [alertTitle, setAlertTitle] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertOpen,setAlertOpen] = React.useState(false);
    function AlertDialogClose(open:boolean){
        setAlertOpen(open)
    }

    const [loading,setLoading] = React.useState(false);
    const [loadingMessage,setLoadingMessage] = React.useState('');

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
                checked={caraReceita}
                onChange={onChangecaraReceita}
                label={caraReceita ? "Sim" : "Não"}/>
                <span className={styles.description}>
                    {caraReceita ? "IMPAGAVÉÉÉL": "Ok"}
                </span>
            </Field>
        </div>
        <div className={useStackClassName()}>
            <Field label="Data de que tentou a receita">
            <DatePicker
                allowTextInput
                value={dataReceita}
                onSelectDate={(data:Date) => {setDataReceita(data)}}
                placeholder="Select a date..."
                />
            </Field>
        </div>
        <div className={useStackClassName()}>
                <Field label="Imagem da Receita">
                    <input type="file" id="inputFile" onChange={addFile.bind(this)} />
                </Field>
            </div>
            <div className={useStackClassName()}>
                <Button icon={<Save24Regular />} onClick={salvarReceita}>Salvar Registro</Button>
            </div>

            <AlertDialog title={alertTitle} message={alertMessage} openDialog={alertOpen} 
            closeDialog={(open:boolean)=>{ AlertDialogClose(open)}}/>
            <Loading openLoading={loading} message={loadingMessage}/>
        </React.Fragment>
    )
}
export default IncludeReceitas