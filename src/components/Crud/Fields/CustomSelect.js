import React, { useState, useEffect } from 'react';
import { api } from "../../../util/Api"
import { Select, message } from 'antd'

const CustomSelect = ({controller, placeholder = 'Selecione uma opção', index='nome', ...rest}) => {
    const [data, setData] = useState()

    const mountItems = (items = []) => {
        return items.map((e) => { return {value: e.id, label: e[index]} })
     }

    useEffect(() => {
        const getData = async () => {
            await api.get(`api/${controller}/listar`)
            .then(({data}) => {
                if (data.ok === 1) setData(data.retorno)
            })
            .catch((err) => {
                message.error('Erro ao carregar registro')
            })
        }

        getData()
    }, [controller])


    return (
        <Select placeholder={placeholder} options={mountItems(data)} {...rest}/>
    );
};

export default CustomSelect;