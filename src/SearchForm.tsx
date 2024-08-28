import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useSearchParams } from 'react-router-dom'
function SearchForm() {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null)
  const [, setSearch] = useSearchParams()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const value = inputRef?.current?.value
    if (value) {
      setSearch({ queryName: value })
    }
  }

  return (
    <>
      <div className={'row SearchFormWrapper'}>
        <div className={'col-lg-6 col-md-8 mx-auto'}>
          <h1>My GitHub Resume</h1>
          <hr />
          <Form
            noValidate={false}
            onSubmit={handleSubmit}
          >
            <InputGroup className='mb-3'>
              <Form.Control
                required
                autoFocus={true}
                id='name'
                pattern='[a-zA-Z][a-zA-Z0-9]{3,200}'
                placeholder='Enter your GitHub username'
                aria-label='Enter your GitHub username'
                // defaultValue={'monya1987'}
                ref={inputRef}
              />

              <Button
                type={'submit'}
                variant={'secondary'}
              >
                Button
              </Button>
            </InputGroup>
            <Form.Text>
              Username couldn&apos;t be empty and should contain only letters
              and numbers and contain more then 3 symbols and starts from
              letter.
            </Form.Text>
          </Form>
          <br />
          <hr />
          <p>
            Examples: <a href='/?queryName=monya1987'>monya1987</a>,{' '}
            <a href='/?queryName=defunkt'>defunkt</a>,{' '}
            <a href='/?queryName=mxcl'>mxcl</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default SearchForm
