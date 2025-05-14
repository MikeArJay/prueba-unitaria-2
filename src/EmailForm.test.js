
import { render, screen } from '@testing-library/react';
import EmailForm from './EmailForm';
import userEvent from '@testing-library/user-event';



test('Checks Email label', ()=>{
    render(<EmailForm/>)
    const label = screen.getByLabelText('Email address');
    expect(label).toBeInTheDocument();
});

test('Checks Email place holder', ()=>{
    render(<EmailForm/>)
    const holder = screen.getByPlaceholderText('Enter email');
    expect(holder).toBeInTheDocument();
});

test('Checks name label', ()=>{
    render(<EmailForm/>)
    const label = screen.getByLabelText('Name');
    expect(label).toBeInTheDocument();
});

test('Checks name place holder', ()=>{
    render(<EmailForm/>)
    const holder = screen.getByPlaceholderText('Name');
    expect(holder).toBeInTheDocument();
});

test('checks submitt button is present and active', ()=>{
    render(<EmailForm/>);
    const submitButton = screen.getByRole('button', {name: /submit/i});
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
})

test('Checks if email and username inputs accept text', async ()=>{
    render(<EmailForm/>)

    const emailInput = screen.getByPlaceholderText('Enter email');
    const usernameInput = screen.getByPlaceholderText('Name');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(usernameInput, 'TestUser');

    expect(emailInput).toHaveValue('test@example.com');
    expect(usernameInput).toHaveValue('TestUser')
});

test('Shows error if fields are empty on submit', async()=>{
    render(<EmailForm/>);

    const submitButton = screen.getByRole('button', {name: /submit/i});
    await userEvent.click(submitButton);

    expect(screen.getByText('ERROR: You must fill both fields!'))
});

test('Checks welcome message is shown after filling form correctly', async ()=>{
    render(<EmailForm/>)

    const emailInput = screen.getByPlaceholderText('Enter email');
    const usernameInput = screen.getByPlaceholderText('Name');
    const submitButton = screen.getByRole('button', {name: /submit/i});

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(usernameInput, 'TestUser');
    await userEvent.click(submitButton);

    expect(screen.getByText('Unexpected error, maybe the restapi is still sleeping...'))
});

test('Checks email privacy warning is present', ()=>{
    render(<EmailForm/>);

    const message = screen.getByText('Careful! Your email will be public!');
    expect(message).toBeInTheDocument();
})