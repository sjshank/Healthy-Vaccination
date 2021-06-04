import React from 'react';

import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import Button from '@salesforce/design-system-react/components/button'; 
import Card from '@salesforce/design-system-react/components/card';
import CardEmpty from '@salesforce/design-system-react/components/card/empty';
import CardFilter from '@salesforce/design-system-react/components/card/filter';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import Icon from '@salesforce/design-system-react/components/icon';
import standardSprite from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';

const sampleItems = [
	{ id: '1', name: 'Cloudhub' },
	{ id: '2', name: 'Cloudhub + Anypoint Connectors' },
	{ id: '3', name: 'Cloud City' },
];

class Example extends React.Component {
	static displayName = 'CardExample';

	state = {
		items: sampleItems,
		isFiltering: false,
	};

	handleFilterChange = (event:any) => {
		const filteredItems = sampleItems.filter((item) =>
			RegExp(event.target.value, 'i').test(item.name)
		);
		this.setState({ isFiltering: true, items: filteredItems });
	};

	handleDeleteAllItems = () => {
		this.setState({ isFiltering: false, items: [] });
	};

	handleAddItem = () => {
		this.setState({ items: sampleItems });
	};

	render() {
		const isEmpty = this.state.items.length === 0;

		return (
			// <IconSettings standardSprite={standardSprite}>
				<div className="slds-grid slds-grid_vertical">
					<Card
						id="ExampleCard"
						filter={
							(!isEmpty || this.state.isFiltering) && (
								<CardFilter onChange={this.handleFilterChange} placeholder=""/>
							)
						}
						headerActions={
							!isEmpty && (
								<Button
									label="Delete All Items"
									onClick={this.handleDeleteAllItems}
								/>
							)
						}
						heading="Releated Items"
						icon={<Icon category="standard" name="document" size="small" />}
						empty={
							isEmpty ? (
								<CardEmpty heading="No Related Items">
									<Button label="Add Item" onClick={this.handleAddItem} />
								</CardEmpty>
							) : null
						}
					>
						<DataTable items={this.state.items} id="DataTableExample-1">
							<DataTableColumn
								label="Opportunity Name"
								property="name"
								truncate
							/>
						</DataTable>
					</Card>
				</div>
			// </IconSettings>
		);
	}
}

export default Example;