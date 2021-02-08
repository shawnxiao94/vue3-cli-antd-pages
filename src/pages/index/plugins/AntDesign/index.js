/*
 * @Author: shawnxiao
 * @Date: 2021-01-30 21:13:13
 * @LastEditTime: 2021-02-07 17:02:38
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/plugins/AntDesign/index.js
 */

// import { AButton } from '@/components/button/'

import {
  ConfigProvider,
  message,
  Button,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Modal,
  Tag,
  Badge,
  Radio,
  List,
  Table,
  Divider,
  Tooltip,
  Space,
  Tabs,
  Spin,
  Popover,
  Upload,
  Select,
  DatePicker,
  Pagination,
  Cascader,
  Card,
  Progress,
  Switch,
  BackTop,
  Drawer,
  Notification,
  Statistic,
  Skeleton
  // Empty
} from 'ant-design-vue'

export function setupAntd(app) {
  const g = app.config.globalProperties
  app
    .use(ConfigProvider)
    .use(Layout)
    .use(Dropdown)
    .use(Badge)
    .use(Tooltip)
    .use(Divider)
    .use(Drawer)
    .use(Avatar)
    .use(BackTop)
    .use(Space)
    .use(Cascader)
    .use(Upload)
    .use(Pagination)
    .use(Tabs)
    .use(Switch)
    .use(Row)
    .use(Col)
    .use(Form)
    .use(Input)
    .use(Select)
    .use(Button)
    .use(Statistic)
    .use(Progress)
    .use(List)
    .use(Tag)
    .use(DatePicker)
    .use(Modal)
    .use(Notification)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Popover)
    .use(Skeleton)
    .use(Spin)
    .use(Checkbox)
    .use(Radio)
  g.$message = message
  g.$info = Modal.info
  g.$success = Modal.success
  g.$error = Modal.error
  g.$warning = Modal.warning
  g.$confirm = Modal.confirm
}
