import React from 'react';
import {Meta, Story } from '@storybook/react';

import { AddItemForm, AddItemFormType } from '../AddItemForm'
import {action} from "@storybook/addon-actions"


export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: {
      description: 'Button inside form clicked'
    }
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<AddItemFormType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addItem: action('Button inside form clicked')
}