import * as React from "react";
import { IEditReceitasProps } from "./IEditReceitaProps";
import { Dialog, DialogBody, DialogSurface, DialogTitle, DialogTrigger, Button, DialogContent, Combobox, Field, Switch, Option, Input, typographyStyles, tokens, makeResetStyles, makeStyles, InputProps, ComboboxProps } from "@fluentui/react-components";
import { Dismiss24Regular } from '@fluentui/react-icons';
import { DatePicker } from "@fluentui/react-datepicker-compat";


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

const EditReceita: React.FunctionComponent<IEditReceitasProps> = (props) => {
    
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



    return(
        <Dialog modalType="alert" open={open} onOpenChange={() => close()}>
            <DialogSurface>
                <DialogBody>
                <DialogTitle action={
                    <DialogTrigger action="close">
                        <Button appearance="subtle"
                                aria-label="close"
                                icon={<Dismiss24Regular/>}
                        />
                    </DialogTrigger>
                }>Edição da Receita</DialogTitle>
                <DialogContent>
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
                    <input type="file" id="inputFile" onChange={addFile.bind(this)} />
                </Field>
            </div>
                </DialogContent>
                </DialogBody>
            </DialogSurface>

        </Dialog>
    )

}

export default EditReceita