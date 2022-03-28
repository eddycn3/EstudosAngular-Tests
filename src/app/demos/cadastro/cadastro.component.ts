import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators,MASKS } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/core/generic-form-validation';
import { Usuario } from './models/usuario';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit,AfterViewInit {

  // COLECAO DE ELEMENTOS DO FORMULARIO
  @ViewChildren(FormControlName,{read: ElementRef}) formInputELements : ElementRef[];

  cadastroFormGroup : FormGroup;
  usuario: Usuario;
  MASKS = utilsBr.MASKS;
  mudancasNaoSalvas: boolean;

  validationMessages: ValidationMessages;
  displayMessage : DisplayMessage= {};
  genericFormValidation: GenericValidator;

  constructor(private formbuilder: FormBuilder) {
    this.validationMessages = {
      nome:{
        required: "O Nome é obrigatório!",
        rangeLength: "O nome deve ter entre 8 e 15 caracteres",
     
      },
      cpf:{
        required: "O CPF é obrigatório!",
        cpf: "O CPF é inválido!"
      },
      email:{
        required: "O E-Mail é obrigatório!",
        email: "O E-Mail é inválido!"
      },
      senha:{
        required: "O Senha é obrigatório!",
        rangeLength: "A senha deve entre 8 e 15 caracteres"
      },
      senhaConfirmacao:{
        required: "O Senha é obrigatório!",
        rangeLength: "A senha deve entre 8 e 15 caracteres",
        equalTo: "A senha inserida não é igual a inserida anteriormente"
      },
    };

    this.genericFormValidation = new GenericValidator(this.validationMessages);
   }  


  ngAfterViewInit(): void {

    // colecao de observable que sera criado atravez do mapeamento de cada item do formulario atravez do evento 'blur'
    // 'blur' : evento ao tirar o foco do item no formulario
    let controlBlurs: Observable<any>[] = this.formInputELements
    .map((formcontrol:ElementRef) => fromEvent(formcontrol.nativeElement,'blur'));

    // pega colecao de observables e aplica para todos os itens da coleção o processamento a cada vez que o evento blur for disparado
    merge(...controlBlurs).subscribe(()=>{
      this.displayMessage = this.genericFormValidation.processarMensagens(this.cadastroFormGroup);
      this.mudancasNaoSalvas = true;
    });

    
  }



  ngOnInit() {
    let senha = new FormControl('',[Validators.required,CustomValidators.rangeLength([8,15])]);
    let senhaConfirmacao = new FormControl('',[Validators.required,CustomValidators.rangeLength([8,15]),CustomValidators.equalTo(senha)]);

    this.cadastroFormGroup = this.formbuilder.group({
      nome: ['',[Validators.required, CustomValidators.rangeLength([2,15])]],
      cpf: ['',[Validators.required, NgBrazilValidators.cpf]],
      email: ['',[Validators.required,Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao
    });
  }

  adicionarUsuario(){
    if(this.cadastroFormGroup.valid && this.cadastroFormGroup.dirty){
      this.usuario = Object.assign({},this.usuario,this.cadastroFormGroup.value);
      console.log(JSON.stringify(this.usuario)); 
      this.mudancasNaoSalvas = false;
    }
    else{
     
    }
  }

}
