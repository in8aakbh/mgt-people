import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Providers, SharePointProvider } from '@microsoft/mgt';
import * as strings from 'PeopleWebPartStrings';
import { People } from './components/People';
import { IPeopleProps } from './components/IPeopleProps';

export interface IPeopleWebPartProps {
  description: string;
}

export default class PeopleWebPart extends BaseClientSideWebPart<IPeopleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPeopleProps> = React.createElement(
      People,
      {
        description: this.properties.description,
        provider: Providers.globalProvider
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    const _ = await super.onInit();
    Providers.globalProvider = new SharePointProvider(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
