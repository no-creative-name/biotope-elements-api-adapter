# Biotope Elements API Adapter

## Definition

This repo functions as a middleware between CMS and Biotope. It handles data fetching, normalization and mapping. Furthermore it renders the HTML tags for the Biotope Elements.

Adapters for ezCMS, Contentful and GraphCMS are already included.

## Documentation

The functionality is seperated into multiple layers:

- Data Fetching & Normalization
- Data Mapping
- Rendering

### Data Fetching & Normalization

The actual adapter that handles fetching and normalization of data from the CMS is located under src/resources/ts/apiAdapter/. Each CMS has its adapter located in a respective folder.

Let's take ezCMS as an example:
The function [createEZAdapter](src/resources/ts/apiAdapter/EZ/createEZAdapter.ts) returns a function getPageData, which returns the data for the whole current web page.

In devvars.env you can set the type of CMS (CMS_ADAPTER) and the CMS' API endpoint (CMSAPI).
The possible options for CMS_ADAPTER are defined in the CMS_ADAPTER_MAP in [renderContentsToPage.ts](src/resources/ts/render/renderContentsToPage.ts).
