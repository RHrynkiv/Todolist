import React from 'react';
import {Meta, Story} from '@storybook/react';

import {Task, TaskPropsType,} from '../Tasks'
import {action} from "@storybook/addon-actions"


export default {
    title: 'Todolist/Task',
    component: Task
} as Meta;

const ChangeTaskStatusCallback = action('Status changed inside Task')
const ChangeTaskTitleCallback = action('Title changed inside Task')
const RemoveTaskCallback = action('Remove Button inside Task clicked ')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: ChangeTaskStatusCallback,
    ChangeTaskTitle: ChangeTaskTitleCallback,
    RemoveTask: RemoveTaskCallback,
}
export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
}


export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
    todolistId: 'todolistId1'
}