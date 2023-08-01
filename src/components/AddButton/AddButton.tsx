import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import './AddButton.less';

function AddButton({ children, ...props }: ButtonProps) {
  return (
    <Button {...props} icon={<PlusOutlined />} type="primary" className="add-button-wrapper">
      {children}
    </Button>
  );
}

export default AddButton;
