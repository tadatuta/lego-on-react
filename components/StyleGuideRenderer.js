var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableOfContents from 'react-styleguidist/lib/rsg-components/TableOfContents';
import StyleGuideRenderer from 'react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer';
import Sections from 'react-styleguidist/lib/rsg-components/Sections';
import Welcome from 'react-styleguidist/lib/rsg-components/Welcome';
import Error from 'react-styleguidist/lib/rsg-components/Error';
import { HOMEPAGE } from 'react-styleguidist/scripts/consts';
import { DisplayModes } from 'react-styleguidist/lib/consts';

const NotFound = () => {
    return (
        <div>
            <h1 style={{fontFamily: 'sans-serif'}}>Lego-on-react</h1>
            <img style={{maxWidth: '100%'}} src="https://jing.yandex-team.ru/files/smdenis/Showcase_2018-01-12_7_PM-39-18.png" />
        </div>
    );
}

/**
 * This function will return true, if the sidebar should be visible and false otherwise.
 *
 * These sorted conditions (highest precedence first) define the visibility
 * state of the sidebar.
 *
 * - Sidebar is hidden for isolated example views
 * - Sidebar is always visible when pagePerSection
 * - Sidebar is hidden when showSidebar is set to false
 * - Sidebar is visible when showSidebar is set to true for non-isolated views
 *
 * @param {boolean} displayMode
 * @param {boolean} showSidebar
 * @param {boolean} pagePerSection
 * @returns {boolean}
 */
function hasSidebar(displayMode, showSidebar) {
	return displayMode === DisplayModes.notFound || showSidebar && displayMode === DisplayModes.all;
}

var StyleGuide = function (_Component) {
	_inherits(StyleGuide, _Component);

	function StyleGuide() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, StyleGuide);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StyleGuide.__proto__ || Object.getPrototypeOf(StyleGuide)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			error: false,
			info: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(StyleGuide, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				codeRevision: this.props.codeRevision,
				config: this.props.config,
				slots: this.props.slots,
				displayMode: this.props.displayMode
			};
		}
	}, {
		key: 'componentDidCatch',
		value: function componentDidCatch(error, info) {
			this.setState({
				error: error,
				info: info
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    config = _props.config,
			    sections = _props.sections,
			    welcomeScreen = _props.welcomeScreen,
			    patterns = _props.patterns,
			    displayMode = _props.displayMode,
			    allSections = _props.allSections,
			    pagePerSection = _props.pagePerSection;


			if (this.state.error) {
				return React.createElement(Error, { error: this.state.error, info: this.state.info });
			}

			if (welcomeScreen) {
				return React.createElement(Welcome, { patterns: patterns || [] });
            }


			return React.createElement(
				StyleGuideRenderer,
				{
					title: config.title,
					version: config.version,
					homepageUrl: HOMEPAGE,
					toc: React.createElement(TableOfContents, { sections: allSections, useRouterLinks: pagePerSection }),
					hasSidebar: hasSidebar(displayMode, config.showSidebar)
				},
                sections.length && sections[0].components.length === 1 ?
                React.createElement(Sections, { sections: sections, depth: 1 }) :
                React.createElement(NotFound, null)
			);
		}
	}]);

	return StyleGuide;
}(Component);

StyleGuide.propTypes = {
	codeRevision: PropTypes.number.isRequired,
	config: PropTypes.object.isRequired,
	slots: PropTypes.object.isRequired,
	sections: PropTypes.array.isRequired,
	welcomeScreen: PropTypes.bool,
	patterns: PropTypes.array,
	displayMode: PropTypes.string,
	allSections: PropTypes.array.isRequired,
	pagePerSection: PropTypes.bool
};
StyleGuide.childContextTypes = {
	codeRevision: PropTypes.number.isRequired,
	config: PropTypes.object.isRequired,
	slots: PropTypes.object.isRequired,
	displayMode: PropTypes.string
};
StyleGuide.defaultProps = {
	displayMode: DisplayModes.all
};
export default StyleGuide;

