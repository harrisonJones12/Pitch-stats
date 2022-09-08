import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import client from 'util/client.js';
import Layout from 'components/layout';
import Heading from 'components/heading';
import BlockContent from 'components/blockContent';
import SiteList from 'components/siteList';
import CategoryRefList from '/components/categoryRefList';

import { footerQuery, blockContentQuery, menuQuery } from 'util/queries';
export default function Home({
  menuData = {},
  pageData = {},
  footerData = {},
  siteList = [],
  preview = false
}) {
  const { title, categoryList, blockContent } = pageData;

  const blockContentRef = useRef();
  const [blockContentVisibility, setBlockContentVisibility] = useState();

  const categoryRefListRef = useRef();
  const [categoryRefListVisibility, setCategoryRefListVisibility] = useState();

  const siteListRef = useRef();
  const [siteListVisibility, setSiteListVisibility] = useState();

  useEffect(() => {
    const blockContentObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setBlockContentVisibility(entry.isIntersecting);
    });

    const categoryRefListObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setCategoryRefListVisibility(entry.isIntersecting);
    });

    const siteListObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setSiteListVisibility(entry.isIntersecting);
    });

    blockContentObserver.observe(blockContentRef.current);
    categoryRefListObserver.observe(categoryRefListRef.current);
    siteListObserver.observe(siteListRef.current);
    return () => {
      siteListObserver.disconnect();
      categoryRefListObserver.disconnect();
      siteListObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Statistikk</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout footerData={footerData} menuData={menuData}>
        <Heading title={title} />
        <div className={`${blockContentVisibility ? 'animate-fadeIn' : ''}`}>
          <BlockContent refs={blockContentRef} blockContent={blockContent || []} />
        </div>
        <div className={`${categoryRefListVisibility ? 'animate-fadeIn' : ''}`}>
          <CategoryRefList refs={categoryRefListRef} categoryList={categoryList || []} />
        </div>
        <div className={`${siteListVisibility ? 'animate-fadeIn' : ''}`}>
          <SiteList refs={siteListRef} siteList={siteList || []} />
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const query = `{"siteList": *[_type=="site"]{title, slug, _type, _id, "category": categoryReference->{title}}, "pageData": *[_type == 'frontPage' && _id == 'frontPage' && !(_id in path("drafts.**"))][0]{title, ${blockContentQuery}, "categoryList": categoryRefList[]->{_id, _type, title, slug, lede, path, ... }, ...}, ${footerQuery}, ${menuQuery} }`;
  const data = await client.fetch(query);
  const { pageData = {}, footerData = {}, siteList = [], menuData = {} } = data;
  return {
    props: {
      pageData: pageData,
      footerData: footerData,
      menuData: menuData,
      siteList: siteList
    },
    revalidate: 200
  };
}
