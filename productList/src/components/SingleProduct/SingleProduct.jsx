import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';
import { required, onlyNumbers } from '../../utils/validators';

const createRenderer = render => ({ input, meta, placeholder, ...rest }) => (
  <div>
    {render(input, placeholder, rest)}
    {meta.touched && meta.error && <FormFeedback style={{ display: 'inline-block' }}>{meta.error}</FormFeedback>}
  </div>
);
const RenderInput = createRenderer((input, placeholder) => <Input {...input} placeholder={placeholder} />);

class SingleProduct extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getSingleProduct(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    if (this.props.editSuccess || this.props.editFail) {
      this.props.editInit();
    }
  }

  onSubmit = values => {
    let product = {
      name: values.name,
      category: values.category,
      active: values.active,
      price: values.price
    };
    this.props.editProduct(values.id, product);
  };

  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
      pristine,
      productPending,
      initialValues,
      editSuccess,
      editFail
    } = this.props;
    if (productPending) {
      return <div>Loading</div>;
    }
    if (!initialValues) {
      return <div>No data</div>;
    }
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {editSuccess && <Alert color="success">Product has been edited</Alert>}
        {editFail && <Alert color="danger">Product could not be edited!</Alert>}
        <FormGroup>
          <Label>Name</Label>
          <Field name="name" component={RenderInput} validate={[required]} />
        </FormGroup>

        <FormGroup>
          <Label>Category</Label>
          <Field name="category" component={RenderInput} validate={[required]} />
        </FormGroup>

        <FormGroup check>
          <Label>
            <Field name="active" component="input" type="checkbox" />
            Active
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>Price</Label>
          <Field name="price" component={RenderInput} validate={[required, onlyNumbers]} />
        </FormGroup>

        <button type="submit" disabled={submitting || invalid || pristine} className="btn btn-danger btn-block">
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'single-product',
  enableReinitialize: true
})(SingleProduct);
