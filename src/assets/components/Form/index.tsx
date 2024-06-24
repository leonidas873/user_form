import {
  useForm,
  SubmitHandler,
  useFormContext,
  FieldErrors,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  terms?: boolean;
  queryType: string;
};

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
  terms: yup.boolean(),
  queryType: yup.string().required(),
});

const Inputs = typeof schema;

const radioButtonsConfig = [
  {
    value: 'generalEnquiry',
    label: 'General Enquity',
  },
  {
    value: 'queryTypeSupport',
    label: 'Support Request',
  },
];

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const notify = (name: string) => {
    toast.success(name + ' you have registered', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    notify(data.firstName);
    reset();
  };

  return (
    <div className="bg-white border-box p-4 max-w-xl m-auto mt-20">
      <h5>Contact Us</h5>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <TextInput
            label="first name"
            placeholder="first name"
            name="firstName"
            register={register}
            error={errors.firstName?.message || ''}
          />
          <TextInput
            label="last name"
            placeholder="last name"
            name="lastName"
            register={register}
            error={errors.lastName?.message || ''}
          />
        </div>
        <TextInput
          label="email"
          placeholder="email"
          name="email"
          register={register}
          error={errors.email?.message || ''}
        />
        <RadioButtons
          config={radioButtonsConfig}
          register={register}
          error={errors.queryType?.message}
          name={'queryType'}
        />
        <div>
          <textarea
            defaultValue=""
            {...register('message')}
            className="w-full"
          />
          {errors.message?.message && <div>{errors.message?.message}</div>}
        </div>
        <label htmlFor="terms">
          <input {...register('terms')} type="checkbox" id="terms" />I agree to
          the terms and conditions
        </label>

        <input className="bg-green-medium text-white" type="submit" />
      </form>
    </div>
  );
}

const TextInput = ({
  name,
  placeholder,
  register,
  error,
  label,
}: {
  name: string;
  placeholder?: string;
  register: any;
  error: string;
  label: string;
}) => {
  return (
    <div className="relative p-2 pb-4 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        defaultValue=""
        {...register(name)}
        placeholder={placeholder || ''}
      />
      {error && (
        <div className="absolute bottom-0 text-xs text-red">{error}</div>
      )}
    </div>
  );
};

const RadioInput = ({
  name,
  register,
  value,
  label,
}: {
  name: string;
  register: any;
  value: string;
  label?: string;
}) => {
  return (
    <label htmlFor={`field-${value}`}>
      <input
        {...register(name)}
        type="radio"
        name={name}
        value={value}
        id={`field-${value}`}
      />
      {label || ''}
    </label>
  );
};

interface IRadioConfig {
  value: string;
  label: string;
}

const RadioButtons = ({
  config,
  register,
  error = '',
  name,
}: {
  config: IRadioConfig[];
  register: any;
  error?: string;
  name: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        {config?.map((radioConfig) => (
          <RadioInput
            name={name}
            register={register}
            value={radioConfig.value}
            label={radioConfig.value}
          />
        ))}
      </div>
      <div>{error && <div>{error}</div>}</div>
    </div>
  );
};
