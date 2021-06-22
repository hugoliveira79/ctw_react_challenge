import React, {Component} from "react";
import './Navigation.css';

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            locations : this.props.locations  
         };

    }

    // Used for rendering
    getClasses(ctx, index) {
        let classes = `material-icons ${ctx}`;
        if (ctx === 'dots') {
            if (this.isLast(index)) {
                classes += ' hidden';
            }
        } else {
            classes += this.isLast(index) ? ' small' : ' x-small';
            if (index === 0) {
                classes += ' first';
            }
        }
        return classes;
    }

    // Used for rendering
    isLast(index) {
        return index === this.props.locations.length - 1;
    }

    isFirst(index) {
        return index === 0;
    }

    
    render() {

        const moveLocation = (from, to) => {

            const data = this.state.locations.map((i,index)=> index);
                
            var f = data.splice(data[from], 1)[0];
                data.splice(data[to-1], 0, f);

                const newLocations = data.map((position)=> this.props.locations[position]);

                this.setState({
                locations : newLocations
            });

        }
        const locations = this.state.locations;

        
        return (
            <div className="layout-row align-items-center justify-content-center navigation-screen">
                <div className="card layout-row flat map-card">
                    <section className="card pb-16 pr-16 flex-auto layout-column justify-content-center">
                        <ul className="pl-0" data-testid="location-list">
                        {
                            locations.map((location, index)=>(

                                <li key={'row' + index} data-testid={'location-' + index}
                                   className="layout-row justify-content-between align-items-center mr-8 pl-40 relative">
                                   <div className="layout-column justify-content-start align-items-center handle">
                                       <i className={this.getClasses('marker', index)}>{this.isLast(index) ? 'room' : 'radio_button_checked'}</i>
                                       <i className={this.getClasses('dots', index)}>more_vert</i>
                                   </div>
                                   <div className="location-name">
                                       <p className="caption text-start mb-4" data-testid="location">{location}</p>
                                   </div>
                                   <div>
                                   {
                                       !this.isFirst(index) &&
                                        <button className="icon-only small mx-0" data-testid="up-button">
                                           <i onClick={()=>moveLocation(index,index-1 )} className="material-icons">arrow_upward</i>
                                       </button>
                                   }
                                      
                                    {
                                        !this.isLast(index) &&
                                        <button className="icon-only small mx-0" data-testid="down-button">
                                            <i onClick={()=>moveLocation(index,index+1)} className="material-icons">arrow_downward</i>
                                        </button>
                                    }
                                   </div>
                                </li>

                                )
                            )
                        }

                                
                        </ul>
                    </section>
                    <section className="flex-auto">
                        <img src="images/map.svg" className="fill" alt="map"/>
                    </section>
                </div>

            </div>
        );
    }
}
