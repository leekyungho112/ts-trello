# Typescript Trello Clone

- react-hook-form

```js
const { register, watch, handleSubmit } = useForm();
```

- handleSubmit이 form에 onsubmit을 대체하고 validation 및 preventDefault등 담당한다.

```js
  <form onSubmit={handleSubmit()}>
```

- handleSubmit()은 두개의 인자를 받는다 데이터가 유효할때 호출하는 함수와 그렇지 않을때의 함수를 인자로 받는다.

- useform을 사용한 validation

```js
 const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'password가 일치하지 않습니다' },
        { shouldFocus: true }
      );
    }
    // setError('extraError', { message: 'Server offline.' });
  };

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com email allowed',
            },
          })}
          placeholder="Email"
        />
        <span style={{ color: 'red' }}>{errors?.email?.message}</span>
        <input
          {...register('username', {
            required: '필수입력항목',
            validate: (value) =>
              value.includes('lee') ? 'lee is not allowed' : true,
            minLength: {
              value: 3,
              message: '3자 이상',
            },
          })}
          placeholder="Username"
        />
        <span style={{ color: 'red' }}>{errors?.username?.message}</span>
        <input
          {...register('password', {
            required: '필수입력항목',
            minLength: {
              value: 5,
              message: '5자이상',
            },
          })}
          placeholder="Password"
        />
        <span style={{ color: 'red' }}>{errors?.password?.message}</span>
        <input
          {...register('password1', {
            required: '필수입력항목',
            minLength: {
              value: 5,
              message: 'your password is too short',
            },
          })}
          placeholder="Password Confirm"
        />
        <span style={{ color: 'red' }}>{errors?.password1?.message}</span>
        <button>ADD</button>
        <span style={{ color: 'red' }}>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
```
