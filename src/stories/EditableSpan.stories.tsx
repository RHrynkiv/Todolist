import React from 'react';
import {Meta, Story } from '@storybook/react';

import { EditableSpan, EditableSpanPropsType } from '../Todolist'
import {action} from "@storybook/addon-actions"


export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: 'Value EditableSpan changed'
    },
    value: {
      defaultValue: 'HTML',
      description: 'start Value EditableSpan'
    }
  }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  onChange: action('Value EditableSpan changed')
}