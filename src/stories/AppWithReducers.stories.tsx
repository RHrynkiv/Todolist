import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions"
import App from '../AppWithReducers';
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator';


export default {
    title: 'Todolist/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <App {...args} />;

export const AppExample = Template.bind({});
AppExample.args = {}