import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

interface CheckboxIntarface {
    checked: boolean;
    title: string;
}
interface CheckboxProps {
    checkboxArr: CheckboxIntarface[];
    setCheckedCheckbox: any;
    setCheckboxValue: any;
    checkboxValue: any;
}
const CheckboxFilter = ({ checkboxArr, setCheckedCheckbox, setCheckboxValue, checkboxValue }: CheckboxProps) => {
    const handleChangeCheckbox = (checkbox: CheckboxIntarface) => {
        const arrCheckboxChecked: CheckboxIntarface[] = checkboxArr;
        const arrCheckboxValue: any = checkboxValue;
        arrCheckboxChecked.forEach((item: CheckboxIntarface) => {
            if (item.title === checkbox.title) {
                item.checked = !item.checked;
                if (JSON.stringify(arrCheckboxValue).includes(JSON.stringify(checkbox.title)) === false) {
                    arrCheckboxValue.push(checkbox.title);
                } else {
                    arrCheckboxValue.forEach((itemArrVal: string, index: number) => {
                        if (checkbox.title === itemArrVal) arrCheckboxValue.splice(index, 1);
                    });
                }
            }
        });
        setCheckedCheckbox([...arrCheckboxChecked]);
        setCheckboxValue(arrCheckboxValue);
    };

    return (
        <FormGroup>
            {checkboxArr.map((checkbox: CheckboxIntarface) => (
                <FormControlLabel
                    sx={{
                        '.MuiFormControlLabel-label': { fontFamily: 'Inter', fontSize: '14px', mt: '2px' }
                    }}
                    control={
                        <Checkbox
                            checkedIcon={<CheckBoxOutlinedIcon />}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                            checked={checkbox.checked}
                            onChange={() => handleChangeCheckbox(checkbox)}
                            name={checkbox.title}
                        />
                    }
                    label={checkbox.title}
                />
            ))}
        </FormGroup>
    );
};

export default CheckboxFilter;
