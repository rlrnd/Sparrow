import {combinePath} from '../utils';

test('test combine path', function(){

    expect(combinePath("","patient.firstName")).toBe("patient.firstName");

    expect(combinePath("equipments[0]","equipments.type")).toBe("equipments[0].type");

    expect(combinePath("equipments[0]","patient.firstName")).toBe("patient.firstName");

    expect(combinePath("equipments[0].misc.notes[0]","equipments.misc.somethingElse")).toBe("equipments[0].misc.somethingElse");

});