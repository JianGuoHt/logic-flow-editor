import type LogicFlow from '@logicflow/core';

import type { Component } from 'vue';

/**
 * 注册自定义图形参数
 */
export type RegisterCusNodeOptions = {
  icon: Component;
  node: Component | LogicFlow.RegisterConfig;
  type: string;
};

/**
 * 注册自定义图形分组
 */
export type RegisterCusNodeGroupOptions = {
  name: string;
  nodes: RegisterCusNodeOptions[];
  type: string;
};
