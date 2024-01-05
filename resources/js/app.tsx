import * as React from 'react'
import { createRoot } from 'react-dom/client'
import FormTest from "./components/pages/TestForm";
require('./bootstrap');

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <FormTest/>
)
