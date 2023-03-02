import { useState } from "react";
import { Input } from "antd";

const formatPhoneNumber = phoneNumber => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(2, 7)}-${cleanedNumber.slice(7)}`;
    return formattedNumber;
}

const Component = ({props, ...rest}) => {
    const [value, setValue] = useState(null)
    return (
        <Input onChange={e => setValue(formatPhoneNumber(e.target.value))} value={value} maxLength={15}/>
    )
}