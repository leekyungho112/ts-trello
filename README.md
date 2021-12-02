# Typescript Trello Clone

- react-hook-form

---

## Preview

[Trello](https://leekyungho112.github.io/ts-trello/)

---

## 코드챌린지

- [x] localStroage 저장
- [x] 새로운 Board추가
- [x] Board item List 휴지통으로 삭제

## 수정 및 개선사항

- [ ] Board간에 drag and drop 설정
- [ ] 리펙토링
- [ ] UI개선

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

- recoil selector는 state를 가져다가 변형해주는 함수이다.
- get function은 selector가 어떤것을 반환할지를 결정한다.

```js
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});
```

- 불필요한 재 렌더링이 많아 최적화를 필요로 할때 React.memo()를 사용한다.
- React.memo()는 props이 변화가 없다면 컴포넌트의 재렌더링을 막는다.

---
