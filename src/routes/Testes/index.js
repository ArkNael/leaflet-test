// import React, { useEffect } from "react";
// import { Form, Input, Card, message, Tooltip } from "antd";
// import { MaskedInput } from "antd-mask-input";
// import { api } from "util/Api"
// import * as Icons from '@ant-design/icons';

// const FormItemWithMaskedInput = (props) => {
//   const [form] = Form.useForm();
  

//   const getRemetente = async value => {
//     // Simulate an async request to get the initial value
//     if (value.length === 11 || value.length === 17) {
//         await api.get(`api/ocorrencias/buscar-beneficiario`, {params: {busca: value}})
//         .then(({data}) => {
//             if (data.ok === 1) {
//                 if (data.retorno.length === 0) {
//                     message.error('Código não encontrado. Verifique e tente novamente.')
//                 } else {
//                     form.setFieldsValue({
//                         maskedInput: '01022001',
//                     });
//                 }
//             } else {
//                 message.error(data.mensagem)
//             }
//         })
//     }

//     // setTimeout(() => {
//     //   const initialValue = "02/28/2023";
      
//     // }, 5000);
//   };

//   return (
//     <Card className="gx-card" title="Testes">
//     <Form form={form}>
//         <Form.Item 
//             label={(
//                 <Tooltip 
//                     title={
//                         <>
//                         <p>Código de identificação:</p>
//                         <p>Para beneficiário ou cooperado, utilizar CPF. Outros casos, utilizar CNPJ</p>
//                         </>
//                     }
//                     color="#00995d"
//                     placement="topRight"
//                     style={{maxWidth: 500}}
//                 >
//                     Código de identificação:
//                     <Icons.QuestionCircleTwoTone style={{marginLeft: 5}}/>
//                 </Tooltip>
//             )} 
//             name="codigoRemetente" 
//             wrapperCol={{span: 8}}
//         >
//             <Input.Search onKeyUp={e => getRemetente(e.target.value)} maxLength={17}/>
//         </Form.Item>
//         <Form.Item name="maskedInput" label="Masked Input">
//             <MaskedInput
//                 mask="00/00/0000"
//                 placeholder="dd/mm/yyyy"
//             />
//         </Form.Item>
//       {/* <Form.Item name="maskedInput" label="Masked Input">
//         <MaskedInput
//           mask="00/00/0000"
//           maskOptions={{lazy: true}}
//         />
//       </Form.Item> */}
//       <Form.Item name="unmaskedInput" label="Unmasked Input">
//         <Input />
//       </Form.Item>
//     </Form>
//     </Card>
//   );
// };

// export default FormItemWithMaskedInput;
