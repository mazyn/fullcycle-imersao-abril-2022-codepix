import React, { forwardRef } from 'react';
import slug from 'slug';

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  labelText?: string;
}

const Select = forwardRef<any, SelectProps>((props, ref) => {
  const { labelText, ...rest } = props;
  const id = props.id ?? props.name ?? slug(labelText ?? '');
  return (
    <div className="form-group">
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <select id={id} className="form-control" ref={ref} {...rest} />
    </div>
  );
});

export default Select;
