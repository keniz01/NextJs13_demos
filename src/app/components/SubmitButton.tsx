import { FormInstance, Form, Button } from "antd";
import { FC, useEffect, useState, MouseEventHandler } from "react";

export const SubmitButton: FC<{
        form: FormInstance,
        onClickHandler: MouseEventHandler<HTMLButtonElement>,
        label: string
    }> = ({ form, onClickHandler, label }) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (

        <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            onClick={onClickHandler}>
            {label}
        </Button>
    );
};
