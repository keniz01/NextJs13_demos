'use client';

import { Layout } from "antd";
import Login from "./login/page"
import { Header, Content, Footer } from "antd/es/layout/layout";

const defaultPage = () => {
    return (
        <Layout>
            <Header>
                <span className="text-white">Demo Test Corp</span>
            </Header>
            <Layout>
                <Content>
                    <Login />
                </Content>
            </Layout>
            <Footer>
                &copy;2023 Demo Test Corp. All rights reserved.
            </Footer>
        </Layout>
    )
}

export default defaultPage;
